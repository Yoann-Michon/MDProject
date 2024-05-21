import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { DeleteResult, Repository } from 'typeorm';
import puppeteer from 'puppeteer';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private articleRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<void> {
    try {
      const articleUrl = createBlogDto.link;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(articleUrl);

      const articleTitle = await page.$eval('h1', (element) => element.textContent.trim());
      //const articleImage = await page.$eval('img', (element) => element.getAttribute('src'));

      await browser.close();

      const article = new Blog();
      article.title = articleTitle;
      //article.image = articleImage;
      await this.articleRepository.save(article);
    } catch (error) {
      throw new Error('Failed to create article from URL');
    }
  }

  findAll() {
    try {
      return this.articleRepository.find();
    } catch (error) {
      throw new ConflictException();
    }
  }

  findOne(id: number) {
    try {
      return this.articleRepository.findOneBy({ id });
    } catch (error) {
      throw new ConflictException();
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    let done = await this.articleRepository.update(id, updateBlogDto);
    if (done.affected != 1) throw new NotFoundException(id);
    return this.findOne(id);
  }

  async remove(id: number) {
    let done: DeleteResult = await this.articleRepository.delete(id);
    if (done.affected != 1) throw new NotFoundException(id);
  }
}
