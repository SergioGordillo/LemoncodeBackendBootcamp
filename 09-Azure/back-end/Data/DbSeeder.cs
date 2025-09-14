using tour_of_heroes_api.Models;

namespace tour_of_heroes_api.Data
{
    public static class DbSeeder
    {
        public static void Seed(HeroContext context)
        {
            if (context.Heroes.Any()) return; // No sembrar si ya hay datos

            var heroes = new List<Hero>
            {
                new Hero("Superman", "Clark Kent", "superman.jpg"),
                new Hero("Batman", "Bruce Wayne", "batman.jpeg"),
                new Hero("Spider-Man", "Peter Parker", "spider-man.jpeg"),
                new Hero("Iron Man", "Tony Stark", "iron-man.jpeg"),
                new Hero("Captain America", "Steve Rogers", "captain-america.jpeg"),
                new Hero("Hulk", "Bruce Banner", "hulk.jpeg"),
                new Hero("Thor", "Thor Odinson", "thor.jpg"),
                new Hero("Daredevil", "Matt Murdock", "daredevil.jpeg"),
                new Hero("Wonder Woman", "Diana Prince", "wonder.jpg"),
                new Hero("Wolverine", "Logan", "wolverine.jpeg"),
                new Hero("Green Arrow", "Oliver Queen", "arrow.jpeg")
            };

            context.Heroes.AddRange(heroes);
            context.SaveChanges();
        }
    }
}