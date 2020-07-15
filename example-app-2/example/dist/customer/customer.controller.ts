import { Controller, Get, Post, Param, Query, Body } from "@nestjs/common";
import { Customer } from "../dto/Customer";
import { CustomerService } from "./customer.service";
import { NotFoundException } from "@nestjs/common";
import { CustomerInput } from "../dto/CustomerInput";

@Controller("customers")
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  /** List all customers */
  @Get()
  findMany(@Query() query: {}): Promise<Customer[]> {
    return this.service.findMany({ where: query });
  }
  /** Create a customer */
  @Post()
  create(@Query() query, @Body() data: CustomerInput): Promise<Customer> {
    return this.service.create({ ...query, data });
  }
  /** Info for a specific customer */
  @Get(":id")
  async findOne(
    @Query() query: {},
    @Param()
    params: {
      id: string;
    }
  ): Promise<Customer> {
    const entity = await this.service.findOne({ ...query, where: params });
    if (entity === null) {
      throw new NotFoundException(
        `No entity was found for ${JSON.stringify(query)}`
      );
    }
    return entity;
  }
}
