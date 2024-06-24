package testParallels;
import com.intuit.karate.junit5.Karate;


public class parallelRunner {
    @Karate.Test
    Karate testLogin() {
        return Karate.run("parallel").relativeTo(getClass());
    }
}

