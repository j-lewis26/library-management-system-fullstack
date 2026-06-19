package com.lms.dao;

import com.lms.entity.Book;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BookDao {

    @Select("SELECT * FROM book")
    List<Book> findAll();

    @Select("SELECT * FROM book WHERE id = #{id}")
    Book findById(Integer id);

    @Insert("""
            INSERT INTO book(name, author, price)
            VALUES(#{name}, #{author}, #{price})
            """)
    int insert(Book book);

    @Update("""
            UPDATE book
            SET name = #{name},
                author = #{author},
                price = #{price}
            WHERE id = #{id}
            """)
    int update(Book book);

    @Delete("DELETE FROM book WHERE id = #{id}")
    int delete(Integer id);

    @Select("""
SELECT * FROM book
LIMIT #{pageSize}
OFFSET #{offset}
""")
    List<Book> findPage(
            @org.apache.ibatis.annotations.Param("pageSize") int pageSize,
            @org.apache.ibatis.annotations.Param("offset") int offset
    );
}
