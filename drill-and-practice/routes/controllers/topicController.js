import * as topicService from "../../services/topicService.js";

const addTopic = async ({ render, user, request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    if (user.admin) {
        if (params.get("topic").length < 1) {
            const errorData = {
                errors: ["Topic has to be at least one character long."],
                topics: await topicService.listTopics(),
                topic: params.get("topic"),
            };
            render("/topics", errorData);
        } else {
            await topicService.addTopic(
                user.id,
                params.get("topic"),
            );
            response.redirect("/topics");
        }
    } else {
        response.redirect("/topics");
    };

};

const listTopics = async ({ render, user }) => {
    render("topics.eta", {
        topics: await topicService.listTopics(),
        user: user,
    });
};

const deleteTopic = async ({ user, response, params }) => {
    if (user.admin) {
        await topicService.deleteTopic(params.id);
        response.redirect("/topics")
    } else {
        response.redirect("/topics")
    }
};

export { addTopic, listTopics, deleteTopic };