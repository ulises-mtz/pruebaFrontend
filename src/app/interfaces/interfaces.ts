export interface ArticuloResponse {
    articulos: {
        total: number;
        data: Articulo[];
    }
    
}

export interface CategoriasResponse {
    articulos: {
        total: number;
        data: Categoria[];
    }
    
}

export interface Articulo {
    clave: string;
    categoria: Categoria;
    nombre: string;
    activo: boolean;
    precios: Precio[];

}

export interface Categoria {
    clave: string;
    fechaCreado: Date;
    nombre: string;
    activo: boolean;
}

export interface Precio{
    precio: number;
}