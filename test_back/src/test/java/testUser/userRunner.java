package testUser;
import com.intuit.karate.junit5.Karate;


public class userRunner {
    @Karate.Test
    Karate testUser() {
        return Karate.run("user").relativeTo(getClass());
    }
}

