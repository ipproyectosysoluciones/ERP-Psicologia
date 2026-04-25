import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Test } from '@nestjs/testing';
import { LeadsModule } from '../leads.module';
import { LeadsService } from '../leads.service';
import { LeadsController } from '../leads.controller';

describe('LeadsModule', () => {
  let module: TestingModuleBuilder;
  let service: LeadsService;
  let controller: LeadsController;

  beforeEach(async () => {
    module = Test.createTestingModule({
      imports: [LeadsModule],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    controller = module.get<LeadsController>(LeadsController);
  });

  afterEach(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('LeadsService', () => {
    it('should have create method', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should have findAll method', () => {
      expect(typeof service.findAll).toBe('function');
    });

    it('should have findOne method', () => {
      expect(typeof service.findOne).toBe('function');
    });

    it('should have update method', () => {
      expect(typeof service.update).toBe('function');
    });

    it('should have remove method', () => {
      expect(typeof service.remove).toBe('function');
    });
  });

  describe('LeadsController', () => {
    it('should have create endpoint', () => {
      expect(typeof controller.create).toBe('function');
    });

    it('should have findAll endpoint', () => {
      expect(typeof controller.findAll).toBe('function');
    });

    it('should have findOne endpoint', () => {
      expect(typeof controller.findOne).toBe('function');
    });
  });
});