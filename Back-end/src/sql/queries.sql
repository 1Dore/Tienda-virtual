create table usuarios(
	u_id serial,
	nombre varchar(100),
	apellido varchar(100),
	correo varchar(100),
	contraseña varchar(100),
	primary key(u_id)
);

create table administradores(
	a_id serial,
	nombre varchar(100),
	apellido varchar(100),
	correo varchar(100),
	contraseña varchar(100),
	primary key(a_id)
);

create table direcciones(
	dir_id serial,
	direccion varchar (200),
    codigo_postal varchar(100),
	u_id int,
	primary key (dir_id),
	foreign key(u_id) references usuarios(u_id)
);

create table emisores(
	e_id serial,
	E_ip varchar(50),
	compañia varchar(50),
	primary key(e_id)
);

create table tarjetas(
	t_id serial,
	num_tar int,
	u_id int,
	e_id int,
	primary key (t_id),
	foreign key (e_id) references emisores(e_id),
	foreign key (u_id) references usuarios(u_id)
);

create table productos(
	pr_id serial,
	pr_nombre varchar(100),
	pr_existencia int,
	pr_precio decimal(15,2),
	pr_categoria varchar(100),
	pr_autor varchar(100),
	pr_descipcion varchar(240),
	pr_foto varchar(120),
	primary key (pr_id)
);

create table courrier(
	c_id serial,
	c_ip varchar(100),
	c_nombre varchar(100),
	primary key(c_id)
);

create table pedido(
	p_id serial,
	dir_entrega varchar(100),
	codigo_postal int,
	estatus varchar(100),
	u_id int,
	e_id int,
	c_id int,
	primary key(p_id),
	foreign key(u_id) references usuarios(u_id),
	foreign key(e_id) references emisores(e_id),
	foreign key(c_id) references courrier(c_id)
);

create table carrito(
	p_id int,
	pr_id int,
	cantidad int,
	primary key(p_id, pr_id),
	foreign key (p_id) references pedido(p_id),
	foreign key (pr_id) references productos(pr_id)
);


