import React from "react";
import { projects } from "../../mocks/dummyData";

export default function ManageProjects() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Projects</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-sm">
          + Create New Project
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-600">
          <div className="col-span-5">Project Details</div>
          <div className="col-span-4">Status/Likes</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        <div className="divide-y divide-gray-100">
          {projects.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-5">
                <div className="font-semibold text-gray-900">{p.title}</div>
                <div className="text-sm text-gray-500 truncate mt-1">{p.description}</div>
              </div>
              <div className="col-span-4 text-sm text-gray-500">
                 <span className="inline-flex items-center gap-1">
                   <span className="text-pink-500">♥</span> {p.likes} likes
                 </span>
              </div>
              <div className="col-span-3 flex justify-end gap-2">
                <button className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors">
                  Edit
                </button>
                <button className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
