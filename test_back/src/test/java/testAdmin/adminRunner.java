package testAdmin;
import com.intuit.karate.junit5.Karate;

public class adminRunner {
    @Karate.Test
    Karate testAdmin() {
        return Karate.run("admin").relativeTo(getClass());
    }    
}
