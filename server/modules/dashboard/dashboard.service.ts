import { metadataDb } from "@/server/configs/db";
import { JsonObject } from "@prisma/client/runtime/library";

export const getAllDashboards = async (userId: string) => {
  return metadataDb.dashboard.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const createDashboard = async (
  userId: string,
  data: {
    name?: string;
  },
) => {
  return metadataDb.dashboard.create({
    data: {
      name: data.name ?? "Untitled Dashboard",
      userId,
    },
  });
};

export const getDashboardById = async (userId: string, dashboardId: string) => {
  return metadataDb.dashboard.findFirst({
    where: {
      id: dashboardId,
      userId,
    },
  });
};

export const updateDashboardById = async (
  userId: string,
  dashboardId: string,
  data: {
    name?: string;
    content?: JsonObject;
  },
) => {
  return metadataDb.dashboard.update({
    where: {
      userId,
      id: dashboardId,
    },
    data,
  });
};
