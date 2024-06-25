const z = require("zod");
const createSpace = z.object({
    type:z.string()
});
const sample = {type:"hi there"};
const ans = createSpace.safeParse(sample);
console.log(ans);
