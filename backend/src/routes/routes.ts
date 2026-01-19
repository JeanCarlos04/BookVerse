import { Router } from "express";
import handleImg from "../controllers/multerController.ts";
import {
  register,
  login,
  getUser,
  logout,
  uploadAvatar,
} from "../controllers/user_controllers.ts";
import { authToken } from "../middlewares/authToken.ts";
import {
  createBooks,
  updateBooks,
  deleteBooks,
  getBook,
  searchBooks,
} from "../controllers/books_controllers.ts";
import {
  addBooks,
  addLikes,
  getUserBooks,
  getLikedBooks,
} from "../controllers/user_books_controllers.ts";

const router = Router();

// USER APIs

router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user/logout", authToken, logout);
router.get("/user/get", authToken, getUser);

// BOOKS APIs

router.post("/books/create", authToken, createBooks);
router.patch(
  "/books/update/:book_id",
  authToken,
  handleImg.single("cover"),
  updateBooks,
);
router.delete("/books/delete/:book_id", authToken, deleteBooks);
router.get("/books/search", authToken, searchBooks);
router.get("/books/get/:book_id", authToken, getBook);

// USER BOOKS APIs

router.post("/user/books/add/:book_id", authToken, addBooks);
router.get("/user/books/get", authToken, getUserBooks);
router.post("/user/books/like/:book_id", authToken, addLikes);
router.get("/user/books/get/liked", authToken, getLikedBooks);

// MULTER APIs

router.post(
  "/user/avatar",
  authToken,
  handleImg.single("avatar"),
  uploadAvatar,
);

export default router;
