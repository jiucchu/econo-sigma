package sigma.chackcheck;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookDetail {
    @Id
    private Long id;

    // 도서 대출/반납 일대다
    @OneToMany(mappedBy = "bookDetail")
    private List<BookBorrow> bookBorrow;
    // 도서 대다일 ***
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "bookId")
    private Book book;
}
