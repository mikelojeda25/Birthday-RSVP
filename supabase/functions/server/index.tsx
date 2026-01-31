import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "@supabase/supabase-js";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
);

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Password"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c6c41ee9/health", (c: any) => {
  return c.json({ status: "ok" });
});

// Submit RSVP
app.post("/make-server-c6c41ee9/rsvp", async (c: any) => {
  try {
    const body = await c.req.json();
    const { name, email, attending, dietaryRestrictions } = body;

    if (!name || !email || attending === undefined) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const rsvpId = `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const rsvp = {
      id: rsvpId,
      name,
      email,
      attending,
      dietaryRestrictions: dietaryRestrictions || "",
      createdAt: new Date().toISOString(),
    };

    await kv.set(rsvpId, rsvp);
    console.log("RSVP created successfully:", rsvpId);
    return c.json({ success: true, rsvpId });
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return c.json(
      { error: "Failed to submit RSVP: " + (error as Error).message },
      500,
    );
  }
});

// Get all RSVPs (protected - requires authentication)
app.get("/make-server-c6c41ee9/rsvps", async (c: any) => {
  try {
    // Get password from query parameters
    const url = new URL(c.req.url);
    const password = url.searchParams.get("password");
    console.log("Received password:", password);

    // Simple password check - admin password is "admin2026"
    if (password !== "admin2026") {
      console.log("Password mismatch. Got:", password, "Expected: admin2026");
      return c.json({ error: "Unauthorized" }, 401);
    }

    const rsvps = await kv.getByPrefix("rsvp_");
    console.log("Retrieved RSVPs:", rsvps.length);
    return c.json({ rsvps });
  } catch (error) {
    console.error("Error retrieving RSVPs:", error);
    return c.json(
      { error: "Failed to retrieve RSVPs: " + (error as Error).message },
      500,
    );
  }
});

// Delete RSVP (protected)
app.delete("/make-server-c6c41ee9/rsvp/:id", async (c: any) => {
  try {
    // Get password from query parameters
    const url = new URL(c.req.url);
    const password = url.searchParams.get("password");
    console.log("Received password for delete:", password);

    if (password !== "admin2026") {
      console.log("Password mismatch for delete. Got:", password);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    await kv.del(id);
    console.log("RSVP deleted successfully:", id);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    return c.json(
      { error: "Failed to delete RSVP: " + (error as Error).message },
      500,
    );
  }
});

export default app;
