import { Router } from "express";
import { 
    createContact, 
    getContacts, 
    getContactById, 
    updateContact, 
    deleteContact 
} from "../controllers/contactController";

const router = Router();

// Define routes for contacts
router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;