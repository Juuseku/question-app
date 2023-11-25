import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const showRegistrationForm = async({ render, response, request }) => {
    render("registration.eta");
};

const addUser = async({ response, request }) => {
    const body = request.body({type: "form"});
    const params = await body.value;
    let admin = false;
    
    await userService.addUser(
        params.get("email"),
        await bcrypt.hash(params.get("password")),
        admin,
    );

    response.redirect("/auth/login");
};

export{ showRegistrationForm, addUser };