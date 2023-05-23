const {body, validationResult } = require('express-validator');

var returnValidationResult = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.send(400, { errors: errors.array() });
    next()
}

var validateRequest = {
    login: [
        body('email').exists().withMessage('Email is required.').isEmail().withMessage('Email is not valid.'),
        body('password').exists().withMessage('Password is required.').isLength({ min: 5 }).withMessage('Password must be 5 char long.'),
        returnValidationResult
    ],
    createUser: [
        body('name').exists().withMessage('Name is required.').isAlpha().withMessage('Name should be alpha.'),
        body('email').exists().withMessage('Email is required.').isEmail().withMessage('Email is not valid.'),
        body('phone').exists().withMessage('Phone is required.').isMobilePhone().withMessage('Phone is not valid.'),
        body('password').exists().withMessage('Password is required.').isLength({ min: 5 }).withMessage('Password must be 5 char long.'),
        returnValidationResult
    ],
    updateUser: [
        body('name').exists().withMessage('Name is required.').isAlpha().withMessage('Name should be alpha.'),
        body('email').exists().withMessage('Email is required.').isEmail().withMessage('Email is not valid.'),
        body('phone').exists().withMessage('Phone is required.').isMobilePhone().withMessage('Phone is not valid.'),
        // body('password').exists().withMessage('Password is required.').isLength({ min: 5 }).withMessage('Password must be 5 char long.'),
        returnValidationResult
    ]
}

module.exports = validateRequest;