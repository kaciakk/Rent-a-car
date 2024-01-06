const User = require('../models/user')
const Car = require('../models/car');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles, email } = req.body;

    // Jeśli roles nie jest przekazane lub jest puste, ustaw domyślnie rolę na "User"
    const userRoles = roles && roles.length ? roles : ['User'];

    // Confirm data
    if (!username || !password || !email)  {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate username or email
    const duplicateUsername = await User.findOne({ username }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' });
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = { username, password: hashedPwd, roles: userRoles, email };

    // Create and store new user 
    const user = await User.create(userObject);

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});
// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, email } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.email = email

    // Sprawdź, czy zostało przesłane nowe hasło
    if (req.body.password) {
        // Hash password 
        user.password = await bcrypt.hash(req.body.password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})


// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const car = await Car.findOne({ user: id }).lean().exec()
    if (car) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

// @desc User login
// @route POST /users/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Szukanie użytkownika w bazie danych
        const user = await User.findOne({ email });

        // Jeśli użytkownik nie istnieje
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Porównanie hasła zapisanego w bazie danych z hasłem przesłanym w zapytaniu
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Zwrócenie odpowiedzi JSON po udanym logowaniu
        res.status(200).json({ message: 'Login successful', user }); // Przykładowa odpowiedź z danymi użytkownika
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    loginUser,
    deleteUser
}

