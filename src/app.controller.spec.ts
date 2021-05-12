// import { ProductController } from './products/product.controller';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import ShopService from './shoppingCart/shoppingCart.service';
import ProductService from './products/productSql.service';

import ShoppingCart from './db/models/shoppingCart.entity';
import Product from './db/models/product.entity';

import TestUtil from './common/test/test.util';
import TestUtilProduct from './common/test/product.util';

import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('Shopping cart Service', () => {
  let shopService: ShopService;

  const mockRepository = {
    find: jest.fn(),
    query: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: getRepositoryToken(ShoppingCart),
          useValue: mockRepository,
        },
      ],
    }).compile();

    shopService = moduleRef.get<ShopService>(ShopService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.delete.mockReset();
    mockRepository.query.mockReset();
  });

  describe('should be defined', () => {
    it('should be defined', async () => {
      expect(shopService).toBeDefined();
    });
  });

  describe('When seach all shop', () => {
    it('should be list all shopping cart', async () => {
      const shop = TestUtil.giveMeAvaliableShop();
      mockRepository.find.mockReturnValue([shop, shop]);
      const shops = await shopService.findAll();

      expect(shops).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When seach shop by Id', () => {
    it('should find a existing shop', async () => {
      const shop = TestUtil.giveMeAvaliableShop();
      mockRepository.findOne.mockReturnValue(shop);

      const shopsFound = await shopService.findOneShop(1);

      expect(shopsFound).toMatchObject({ userId: shop.userId });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  it('should return a expection when does not to find a shopCart', async () => {
    mockRepository.findOne.mockReturnValue(null);

    expect(shopService.findOneShop(5)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
  });

  describe('When Create shop', () => {
    it('should create shop cart', async () => {
      const shop = TestUtil.giveMeAvaliableShop();
      mockRepository.save.mockReturnValue(shop);
      mockRepository.create.mockReturnValue(shop);

      const saveShop = await shopService.create(shop);

      expect(saveShop).toMatchObject(shop);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });
  it('should return a expection when doesnt create shopCart', async () => {
    const shop = TestUtil.giveMeAvaliableShop();

    mockRepository.save.mockReturnValue(null);
    mockRepository.create.mockReturnValue(null);

    await shopService.create(shop).catch((e) => {
      expect(e).toBeInstanceOf(InternalServerErrorException);
      expect(e).toMatchObject({
        message: 'Problem to create a shop. Please try again',
      });
    });

    expect(mockRepository.create).toBeCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  describe('When delete shop', () => {
    it('should delete existing shop', async () => {
      const shop = TestUtil.giveMeAvaliableShop();

      mockRepository.delete.mockReturnValue(shop);
      mockRepository.findOne.mockReturnValue(shop);

      const deletedShop = await shopService.deleteShopById(1);

      expect(deletedShop).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should not delete a inexisting shop', async () => {
      const shop = TestUtil.giveMeAvaliableShop();

      mockRepository.delete.mockReturnValue(shop);
      mockRepository.findOne.mockReturnValue(shop);

      const deletedShop = await shopService.deleteShopById(9);

      expect(deletedShop).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Product Service', () => {
  let productService: ProductService;

  const mockRepository = {
    find: jest.fn(),
    query: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.delete.mockReset();
    mockRepository.query.mockReset();
  });

  describe('should be defined', () => {
    it('should be defined', async () => {
      expect(productService).toBeDefined();
    });
  });

  describe('When seach all product', () => {
    it('should be list all product', async () => {
      const product = TestUtilProduct.giveMeAvaliableProduct();
      mockRepository.find.mockReturnValue([product, product]);
      const products = await productService.findAll();

      expect(products).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When seach product by Id', () => {
    it('should find a existing product', async () => {
      const product = TestUtilProduct.giveMeAvaliableProduct();
      mockRepository.findOne.mockReturnValue(product);

      const productsFound = await productService.findOneProduct(1);

      expect(productsFound).toMatchObject({ id: product.id });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  it('should return a expection when does not to find a product', async () => {
    mockRepository.findOne.mockReturnValue(null);

    expect(productService.findOneProduct(5)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
  });

  describe('When Create product', () => {
    it('should create product', async () => {
      const product = TestUtilProduct.giveMeAvaliableProduct();
      mockRepository.save.mockReturnValue(product);
      mockRepository.create.mockReturnValue(product);

      const saveproduct = await productService.create(product);

      expect(saveproduct).toMatchObject(product);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });
  it('should return a expection when doesnt create product', async () => {
    const product = TestUtilProduct.giveMeAvaliableProduct();

    mockRepository.save.mockReturnValue(null);
    mockRepository.create.mockReturnValue(null);

    await productService.create(product).catch((e) => {
      expect(e).toBeInstanceOf(InternalServerErrorException);
      expect(e).toMatchObject({
        message: 'Problem to create a product. Please try again',
      });
    });

    expect(mockRepository.create).toBeCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  describe('When delete product', () => {
    it('should delete existing product', async () => {
      const product = TestUtilProduct.giveMeAvaliableProduct();

      mockRepository.delete.mockReturnValue(product);
      mockRepository.findOne.mockReturnValue(product);

      const deletedproduct = await productService.deleteProductById(1);

      expect(deletedproduct).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should not delete a inexisting product', async () => {
      const product = TestUtilProduct.giveMeAvaliableProduct();

      mockRepository.delete.mockReturnValue(product);
      mockRepository.findOne.mockReturnValue(product);

      const deletedproduct = await productService.deleteProductById(9);

      expect(deletedproduct).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
