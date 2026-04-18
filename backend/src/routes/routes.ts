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
router.post("/contacts", createContact);
router.get("/contacts", getContacts);
router.get("/contacts/:id", getContactById);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;