package com.lms.service;


import com.lms.dao.BookDao;
import com.lms.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookDao bookDao;

    public Book getById(Integer id) {
        return bookDao.findById(id);
    }

    public List<Book> getAll() {
        return bookDao.findAll();
    }

    public int save(Book book) {
        return bookDao.insert(book);
    }

    public int update(Book book) {
        return bookDao.update(book);
    }

    public int delete(Integer id) {
        return bookDao.delete(id);
    }

    public List<Book> findPage(int pageSize, int offset){
        return bookDao.findPage(pageSize, offset);
    }
}
