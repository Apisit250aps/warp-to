import client from "@/lib/client";
import { Warp } from "./schema";

export const warps = client.db().collection<Warp>("warps");