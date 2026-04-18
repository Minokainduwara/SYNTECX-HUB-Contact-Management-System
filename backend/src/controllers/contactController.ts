import { Request, Response } from "express";
import Contact from "../models/contact";

// CREATE
export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL + SEARCH
export const getContacts = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    let filter = {};

    if (query) {
      filter = {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
        ],
      };
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateContact = async (req: Request, res: Response) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteContact = async (req: Request, res: Response) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};