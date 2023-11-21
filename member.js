function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 34,
        skills: ['js', 'html', 'css'],
        showSkills: function() {
            var self = this;
            this.skills.forEach(function(skill) {
                console.log(self.name + ' knows ' + skill);
            });
        }
    };
    member.showSkills();
}