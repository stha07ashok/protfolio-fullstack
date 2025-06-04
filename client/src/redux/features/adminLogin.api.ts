import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "@/baseUrl/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl}/admin/login`,
  credentials: "include",
  prepareHeaders: (Headers: Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});
