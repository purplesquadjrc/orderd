import { Router, type IRouter } from "express";
import { db, galleryImagesTable } from "@workspace/db";
import { insertGalleryImageSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/gallery", async (req, res) => {
  try {
    const images = await db
      .select()
      .from(galleryImagesTable)
      .orderBy(desc(galleryImagesTable.createdAt));
    res.json(images);
  } catch (err) {
    req.log.error(err, "Failed to fetch gallery images");
    res.status(500).json({ error: "Failed to fetch gallery images" });
  }
});

router.post("/gallery", async (req, res) => {
  const parsed = insertGalleryImageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  try {
    const [created] = await db
      .insert(galleryImagesTable)
      .values(parsed.data)
      .returning();
    res.status(201).json(created);
  } catch (err) {
    req.log.error(err, "Failed to create gallery image");
    res.status(500).json({ error: "Failed to create gallery image" });
  }
});

router.delete("/gallery/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  try {
    const [deleted] = await db
      .delete(galleryImagesTable)
      .where(eq(galleryImagesTable.id, id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: "Gallery image not found" });
      return;
    }
    res.json(deleted);
  } catch (err) {
    req.log.error(err, "Failed to delete gallery image");
    res.status(500).json({ error: "Failed to delete gallery image" });
  }
});

export default router;
