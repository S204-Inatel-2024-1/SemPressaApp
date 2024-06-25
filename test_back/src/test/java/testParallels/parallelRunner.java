package testParallels;
import com.intuit.karate.junit5.Karate;


public class parallelRunner {
    @Karate.Test
    Karate testParallel() {
        return Karate.run("parallel").relativeTo(getClass());
    }
}

