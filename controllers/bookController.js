import { 
  getAllBooks, 
  getAvailableBooks, 
  createBook, 
  updateBook, 
  deleteBook ,
  getBookById,
} from "../services/bookService.js";


export const getBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


export const getBookByIdController = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAvailableBooksController = async (req, res) => {
  try {
    const books = await getAvailableBooks();
    res.json(books);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createBookController = async (req, res) => {
  try {
    const book = await createBook(req.body);
    res.status(201).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


export const updateBookController = async (req, res) => {
  try {
    const book = await updateBook(req.params.id, req.body);
    res.json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


export const deleteBookController = async (req, res) => {
  try {
    await deleteBook(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
