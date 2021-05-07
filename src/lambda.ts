import {AppModule} from './app.module';
import {Kernel} from "@pristine-ts/core";
import {Context} from "aws-lambda";
import {RequestMapper, ResponseMapper} from "@pristine-ts/aws";

export const handler = async (event: any, context: Context) => {
    const kernel = new Kernel();
    await kernel.init(AppModule);

    const apiGatewayRequestMapper = kernel.container.resolve(RequestMapper);
    const apiGatewayResponseMapper = kernel.container.resolve(ResponseMapper);

    return apiGatewayResponseMapper.reverseMap(await kernel.handleRequest(apiGatewayRequestMapper.map(event)));
};
