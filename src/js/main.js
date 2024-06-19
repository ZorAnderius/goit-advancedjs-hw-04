import { refs } from "./refs";
//infinity scroll
import { handlerSubmit } from "./handlers_infinity";

//load more button
// import { handlerSubmit } from "./handlers_load_more";

refs.form.addEventListener('submit', handlerSubmit);
