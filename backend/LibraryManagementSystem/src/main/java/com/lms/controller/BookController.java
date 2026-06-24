package com.lms.controller;

import com.lms.entity.Book;
import com.lms.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAll();
    }

    @GetMapping("/{id}")
    public Book getBookById
            (@PathVariable Integer id) {
        return bookService.getById(id);

    }

    @PostMapping
    public String addBook(@RequestBody Book book) {

        int result = bookService.save(book);

        if(result > 0){
            return "Book Added Successfully";
        }

        return "Failed";
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Integer id){

        int result = bookService.delete(id);

        if(result > 0){
            return "Deleted Successfully";
        }

        return "Delete unsuccessful";
    }

    @PutMapping("/{id}")
    public String updateBook(@PathVariable Integer id,
                             @RequestBody Book book){

        book.setId(id);

        int result = bookService.update(book);

        if(result > 0){
            return "Updated Successfully";
        }

        return "Update Failed";
    }

    @GetMapping("/page/{pageNum}/{pageSize}")
    public List<Book> getPage(
            @PathVariable Integer pageNum,
            @PathVariable Integer pageSize){

        int offset = (pageNum - 1) * pageSize;

        return bookService.findPage(pageSize, offset);
    }
}

