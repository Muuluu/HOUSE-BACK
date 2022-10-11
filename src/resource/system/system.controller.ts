import {
 Controller,
 Post,
 UploadedFile,
 UseInterceptors,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { upload } from "../../utils/uploadfile";

@ApiTags("System")
@Controller("system")
//@UseGuards(UserAccessGuard)
@ApiBearerAuth("access-token")
export class SystemController {
  constructor() {}
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file) {
    return await upload(file);
  }
}
