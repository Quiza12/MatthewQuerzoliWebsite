export class FashionFave {
  brand: string;
  description: string;
  website: string;
  instagram: string;
  image: string;
  tags: string[];
 
  constructor(brand: string, description: string, website: string, instagram: string, image: string, tags: string[]) {
    this.brand = brand;
    this.description = description;
    this.website = website;
    this.instagram = instagram;
    this.image = image;
    this.tags = tags;
  }

}