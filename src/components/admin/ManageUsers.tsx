import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getUsers,
  deleteUser,
  updateUserRole,
  type UserItem,
} from "../../services/contentApi";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message ?? "Failed to fetch users";
  }

  return "Failed to fetch users";
};

export default function ManageUsers() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string>("");
  const [actionError, setActionError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      try {
        const data = await getUsers();

        if (mounted) {
          setUsers(data);
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

    void loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setActionLoading(userId);
    setActionError("");

    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      setActionError(extractErrorMessage(err));
    } finally {
      setActionLoading("");
    }
  };

  const handleRoleChange = async (userId: string, newRole: "superadmin" | "admin" | "member") => {
    setActionLoading(userId);
    setActionError("");

    try {
      const updatedUser = await updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? updatedUser : u))
      );
    } catch (err) {
      setActionError(extractErrorMessage(err));
    } finally {
      setActionLoading("");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
      </div>

      {actionError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {actionError}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-600">
          <div className="col-span-4">User Info</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        <div className="divide-y divide-gray-100">
          {loading && <div className="p-4 text-gray-500">Loading users...</div>}
          {error && !loading && <div className="p-4 text-red-600">{error}</div>}
          {!loading && !error && users.length === 0 && (
            <div className="p-4 text-gray-500">No users found.</div>
          )}
          {!loading &&
            !error &&
            users.map((u) => (
              <div
                key={u.id}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-4">
                  <div className="font-semibold text-gray-900">{u.name}</div>
                  <div className="text-xs text-gray-500 mt-1">ID: {u.id.slice(0, 8)}...</div>
                </div>
                <div className="col-span-3 text-sm text-gray-600 truncate">{u.email}</div>
                <div className="col-span-2">
                  <select
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(
                        u.id,
                        e.target.value as "superadmin" | "admin" | "member"
                      )
                    }
                    disabled={actionLoading === u.id}
                    className="px-3 py-1.5 rounded text-sm border border-gray-200 bg-white text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="superadmin">Superadmin</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                </div>
                <div className="col-span-3 flex justify-end gap-2">
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    disabled={actionLoading === u.id}
                    className="px-4 py-2 border border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed text-red-600 rounded-lg text-sm font-medium transition-colors"
                  >
                    {actionLoading === u.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
