import * as optionService from "../../services/optionService.js";

const showOptions = async ({ render, params, response }) => {
    render("options.eta");
};

const addOption = async ({ request, params, response }) => {
    const body = request.body({type: "form"});
    const info = await body.value;
    let isCorrect = false
    if (info.get("is_correct")) {
        isCorrect = true;
    };
    
    
    await optionService.addOption(
        params.qId,
        info.get("option_text"),
        isCorrect,
    );
    
    response.redirect(`/topics/${ params.id }/questions/${ params.qId }`)
};

const deleteOption = async({response, params}) => {
    
    const oId = params.oId;
    optionService.deleteOption(oId);
    response.redirect(`/topics/${ params.id }/questions/${ params.qId }`)
};

export { showOptions, addOption, deleteOption };