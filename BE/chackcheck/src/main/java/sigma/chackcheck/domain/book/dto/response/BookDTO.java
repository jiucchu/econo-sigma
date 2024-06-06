package sigma.chackcheck.domain.book.dto.response;

import static lombok.AccessLevel.PROTECTED;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sigma.chackcheck.domain.book.domain.Book;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String publisher;

    public static BookDTO of(Book book){
        return BookDTO.builder()
            .id(book.getId())
            .title(book.getTitle())
            .publisher(book.getPublisher())
            .author(book.getAuthor())
            .build();
    }
}