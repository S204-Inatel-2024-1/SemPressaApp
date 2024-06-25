package testTeams;
import com.intuit.karate.junit5.Karate;


public class teamsRunner {
    @Karate.Test
    Karate testTeam() {
        return Karate.run("teams").relativeTo(getClass());
    }
}

