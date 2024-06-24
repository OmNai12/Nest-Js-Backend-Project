import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {

    constructor(private reportService: ReportsService) { }

    @Post()
    @Serialize(ReportDto)
    async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return await this.reportService.create(body, user);
    }

    @UseGuards(AdminGuard)
    @Patch('/:id')
    async approvedReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
        return await this.reportService.changeApproval(id, body.approved);
    }

    @Get()
    async getEstimate(@Query() query: GetEstimateDto) {
        // Hard coded
        return {
            "price": 2000
        };
    }
}
