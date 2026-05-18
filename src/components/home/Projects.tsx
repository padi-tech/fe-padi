import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProjects, likeProject, recordProjectClick, type ProjectItem } from "../../services/contentApi";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message ?? "Failed to fetch projects";
  }

  return "Failed to fetch projects";
};

const Projects = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [liking, setLiking] = useState<Set<string>>(new Set());

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        const data = await getProjects();

        if (mounted) {
          setProjects(data.slice(0, 3));
          setError("");
        }
      } catch (err) {
        if (mounted) {
          setError(extractErrorMessage(err));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLike = async (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (liking.has(projectId)) return;

    setLiking((prev) => new Set([...prev, projectId]));

    try {
      const updated = await likeProject(projectId);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, likes: updated.likes } : p))
      );
    } catch (err) {
      console.error("Failed to like project:", err);
    } finally {
      setLiking((prev) => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const handleProjectClick = async (projectLink: string, projectId: string) => {
    try {
      await recordProjectClick(projectId);
    } catch (err) {
      console.error("Failed to record click:", err);
    }
    window.open(projectLink, "_blank");
  };

  return (
    <section id="projects" className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-lowest scroll-mt-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Featured Projects</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Discover how we've helped industry leaders transform their digital landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading && <p className="col-span-full text-center text-on-surface-variant">Loading projects...</p>}
          {error && !loading && <p className="col-span-full text-center text-red-600">{error}</p>}
          {!loading && !error && projects.length === 0 && (
            <p className="col-span-full text-center text-on-surface-variant">No project published yet.</p>
          )}
          {!loading && !error &&
            projects.map((project) => (
              <div key={project.id} className="bg-surface rounded-[32px] overflow-hidden border border-outline-variant/10 level-1-shadow hover:-translate-y-2 transition-all duration-300">
                <img
                  alt={project.title}
                  className="w-full h-64 object-cover"
                  src={project.imageLink || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
                />
                <div className="p-10 text-center space-y-4">
                  <h3 className="font-headline-md text-[24px] text-on-surface">{project.title}</h3>
                  <p className="font-body-md text-on-surface-variant line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      onClick={(e) => handleLike(project.id, e)}
                      disabled={liking.has(project.id)}
                      className="inline-flex items-center gap-1 text-sm font-medium transition-all hover:scale-110 disabled:opacity-50"
                    >
                      <span className={`transition-all ${liking.has(project.id) ? "animate-pulse" : ""}`}>
                        ♥
                      </span>
                      <span className="text-on-surface-variant">{project.likes}</span>
                    </button>
                    <button
                      onClick={() => handleProjectClick(project.projectLink || "#", project.id)}
                      className="inline-flex items-center text-primary font-label-bold group"
                    >
                      View Project <span className="material-symbols-outlined ml-2 text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
