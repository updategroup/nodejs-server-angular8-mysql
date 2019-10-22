const User = function(user) {
    this.fullName = user.fullName,
        this.id = user.id,
        this.email = user.email,
        this.password = user.password,
        this.role = user.role
}
module.exports = User;