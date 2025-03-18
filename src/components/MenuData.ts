export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  customizationOptions?: {
    id: string;
    name: string;
    price: number;
  }[];
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Bruschetta Italiana",
    description:
      "Pão italiano tostado com tomate, manjericão e azeite de oliva",
    price: 18.9,
    image:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80",
    category: "entradas",
    tags: ["vegetariano", "popular"],
    featured: true,
    customizationOptions: [
      { id: "1-1", name: "Sem tomate", price: 0 },
      { id: "1-2", name: "Extra queijo", price: 3.5 },
    ],
  },
  {
    id: "2",
    name: "Carpaccio",
    description: "Finas fatias de carne crua com molho especial e alcaparras",
    price: 32.9,
    image:
      "https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=400&q=80",
    category: "entradas",
    tags: ["carne", "gourmet"],
    customizationOptions: [
      { id: "2-1", name: "Sem alcaparras", price: 0 },
      { id: "2-2", name: "Extra parmesão", price: 4 },
    ],
  },
  {
    id: "3",
    name: "Filé Mignon ao Molho Madeira",
    description: "Filé mignon grelhado com molho madeira e batatas rústicas",
    price: 59.9,
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80",
    category: "principais",
    tags: ["carne", "premium"],
    featured: true,
    customizationOptions: [
      { id: "3-1", name: "Ponto da carne: Mal passada", price: 0 },
      { id: "3-2", name: "Ponto da carne: Ao ponto", price: 0 },
      { id: "3-3", name: "Ponto da carne: Bem passada", price: 0 },
      { id: "3-4", name: "Sem batatas", price: -5 },
    ],
  },
  {
    id: "4",
    name: "Risoto de Funghi",
    description: "Arroz arbóreo cremoso com mix de cogumelos e parmesão",
    price: 48.9,
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",
    category: "principais",
    tags: ["vegetariano", "gourmet"],
    customizationOptions: [
      { id: "4-1", name: "Sem parmesão", price: 0 },
      { id: "4-2", name: "Extra cogumelos", price: 6 },
    ],
  },
  {
    id: "5",
    name: "Vinho Tinto",
    description: "Garrafa de vinho tinto seco importado",
    price: 89.9,
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
    category: "bebidas",
    tags: ["alcoólico", "premium"],
  },
  {
    id: "6",
    name: "Suco Natural",
    description: "Suco de frutas frescas sem adição de açúcar",
    price: 12.9,
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80",
    category: "bebidas",
    tags: ["saudável", "sem álcool"],
    customizationOptions: [
      { id: "6-1", name: "Laranja", price: 0 },
      { id: "6-2", name: "Limão", price: 0 },
      { id: "6-3", name: "Morango", price: 2 },
    ],
  },
  {
    id: "7",
    name: "Tiramisu",
    description: "Sobremesa italiana com café, queijo mascarpone e cacau",
    price: 24.9,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    category: "sobremesas",
    tags: ["doce", "popular"],
    featured: true,
  },
  {
    id: "8",
    name: "Cheesecake",
    description: "Torta de cream cheese com calda de frutas vermelhas",
    price: 22.9,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80",
    category: "sobremesas",
    tags: ["doce", "frutas"],
    customizationOptions: [
      { id: "8-1", name: "Sem calda", price: -2 },
      { id: "8-2", name: "Extra calda", price: 3 },
    ],
  },
  {
    id: "9",
    name: "Lasanha à Bolonhesa",
    description: "Camadas de massa intercaladas com molho bolonhesa e bechamel",
    price: 45.9,
    image:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80",
    category: "principais",
    tags: ["carne", "popular"],
    customizationOptions: [
      { id: "9-1", name: "Sem queijo", price: 0 },
      { id: "9-2", name: "Extra molho", price: 3 },
    ],
  },
  {
    id: "10",
    name: "Salada Caesar",
    description: "Alface romana, croutons, parmesão e molho caesar",
    price: 28.9,
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&q=80",
    category: "entradas",
    tags: ["saudável", "leve"],
    customizationOptions: [
      { id: "10-1", name: "Sem croutons", price: 0 },
      { id: "10-2", name: "Adicionar frango", price: 8 },
    ],
  },
  {
    id: "11",
    name: "Água com Gás",
    description: "Água mineral gaseificada",
    price: 6.9,
    image:
      "https://images.unsplash.com/photo-1564601455749-529801a87863?w=400&q=80",
    category: "bebidas",
    tags: ["sem álcool"],
  },
  {
    id: "12",
    name: "Mousse de Chocolate",
    description: "Mousse de chocolate belga com raspas de chocolate",
    price: 18.9,
    image:
      "https://images.unsplash.com/photo-1511715282680-fbf93a50e721?w=400&q=80",
    category: "sobremesas",
    tags: ["chocolate", "doce"],
    customizationOptions: [{ id: "12-1", name: "Com calda extra", price: 2 }],
  },
  {
    id: "13",
    name: "Nhoque ao Molho Quatro Queijos",
    description: "Nhoque de batata com molho cremoso de quatro queijos",
    price: 42.9,
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80",
    category: "principais",
    tags: ["vegetariano", "queijo"],
    customizationOptions: [{ id: "13-1", name: "Extra parmesão", price: 4 }],
  },
  {
    id: "14",
    name: "Caipirinha",
    description: "Bebida tradicional brasileira com cachaça, limão e açúcar",
    price: 18.9,
    image:
      "https://images.unsplash.com/photo-1541591425126-4e9be8d1e7a9?w=400&q=80",
    category: "bebidas",
    tags: ["alcoólico", "popular"],
    customizationOptions: [
      { id: "14-1", name: "Limão", price: 0 },
      { id: "14-2", name: "Morango", price: 2 },
      { id: "14-3", name: "Maracujá", price: 2 },
    ],
  },
  {
    id: "15",
    name: "Petit Gateau",
    description:
      "Bolo quente de chocolate com centro derretido e sorvete de creme",
    price: 26.9,
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80",
    category: "sobremesas",
    tags: ["chocolate", "quente", "premium"],
    featured: true,
    customizationOptions: [
      { id: "15-1", name: "Sem sorvete", price: -3 },
      { id: "15-2", name: "Sorvete de chocolate", price: 2 },
    ],
  },
  {
    id: "16",
    name: "Polenta Frita",
    description: "Bastões de polenta crocantes por fora e macios por dentro",
    price: 22.9,
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a9e?w=400&q=80",
    category: "entradas",
    tags: ["vegetariano", "crocante"],
    customizationOptions: [{ id: "16-1", name: "Com parmesão", price: 3 }],
  },
];
