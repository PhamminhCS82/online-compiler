import ApiConfig, { endpoints } from "../configs/ApiConfig";
import IRuncode from "../types/IRuncode";

const create = (data: IRuncode) => {
    return ApiConfig.post(endpoints['compiler'], data)
}

const CompilerService = {
    create,
}

export default CompilerService;