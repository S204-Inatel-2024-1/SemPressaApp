package testProject;
import com.intuit.karate.junit5.Karate;


public class projectRunner {
    @Karate.Test
    Karate testProject() {
        return Karate.run("project").relativeTo(getClass());
    }
}

