﻿// <auto-generated />
using System;
using CompanyCompanionBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CompanyCompanionBackend.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CompanyCompanionBackend.Models.CompanyModel.Company", b =>
                {
                    b.Property<int>("CompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CompanyId"), 1L, 1);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CityCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Template")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CompanyId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.CustomerModel.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CustomerId"), 1L, 1);

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("CustomerAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerCity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CustomerCreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerNip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CustomerId");

                    b.HasIndex("CompanyId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceCorrectModel.InvoiceCorrect", b =>
                {
                    b.Property<int>("InvoiceCorrectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InvoiceCorrectId"), 1L, 1);

                    b.Property<string>("AccountNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreateUser")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerCityCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerDeliveryAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerNip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateIssued")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DueDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceCorrectNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceCorrectNoFrom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceDateCorrect")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsGenerated")
                        .HasColumnType("bit");

                    b.Property<string>("IssueCorrect")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("NetTotal")
                        .HasColumnType("float");

                    b.Property<double>("NetTotalCorrect")
                        .HasColumnType("float");

                    b.Property<string>("PaymentDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaceOfIssue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerCityCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerDeliveryAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerIdName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerNip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Tax")
                        .HasColumnType("float");

                    b.Property<double>("TaxCorrect")
                        .HasColumnType("float");

                    b.Property<double>("Total")
                        .HasColumnType("float");

                    b.Property<double>("TotalCorrect")
                        .HasColumnType("float");

                    b.HasKey("InvoiceCorrectId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("CustomerId");

                    b.ToTable("InvoicesCorrect");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceCountModel.InvoiceCount", b =>
                {
                    b.Property<int>("InvoiceCountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InvoiceCountId"), 1L, 1);

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("DateIssued")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("InvoiceNumber")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("InvoiceCountId");

                    b.HasIndex("CompanyId");

                    b.ToTable("InvoiceCounts");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceCountModel.ProformaCount", b =>
                {
                    b.Property<int>("ProformaCountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProformaCountId"), 1L, 1);

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("DateIssued")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProformaNumber")
                        .HasColumnType("int");

                    b.HasKey("ProformaCountId");

                    b.HasIndex("CompanyId");

                    b.ToTable("ProformaCounts");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceModel.Invoice", b =>
                {
                    b.Property<int>("InvoiceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InvoiceId"), 1L, 1);

                    b.Property<string>("AccountNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreateUser")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerCityCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerDeliveryAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerNip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateIssued")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DueDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsGenerated")
                        .HasColumnType("bit");

                    b.Property<double>("NetTotal")
                        .HasColumnType("float");

                    b.Property<string>("PaymentDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaceOfIssue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerCityCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerDeliveryAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerIdName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerNip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Tax")
                        .HasColumnType("float");

                    b.Property<double>("Total")
                        .HasColumnType("float");

                    b.HasKey("InvoiceId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("CustomerId");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceModel.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProductId"), 1L, 1);

                    b.Property<double>("BruttoPrice")
                        .HasColumnType("float");

                    b.Property<int?>("InvoiceCorrectId")
                        .HasColumnType("int");

                    b.Property<int?>("InvoiceId")
                        .HasColumnType("int");

                    b.Property<bool>("IsActual")
                        .HasColumnType("bit");

                    b.Property<double>("NettoPrice")
                        .HasColumnType("float");

                    b.Property<string>("ProductCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProformaId")
                        .HasColumnType("int");

                    b.Property<double>("Qty")
                        .HasColumnType("float");

                    b.Property<double>("SalesPrice")
                        .HasColumnType("float");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Vat")
                        .HasColumnType("float");

                    b.HasKey("ProductId");

                    b.HasIndex("InvoiceCorrectId");

                    b.HasIndex("InvoiceId");

                    b.HasIndex("ProformaId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.ProdMagazine.ProductMagazine", b =>
                {
                    b.Property<int>("ProductMagazineId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProductMagazineId"), 1L, 1);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<double>("Qty")
                        .HasColumnType("float");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Vat")
                        .HasColumnType("float");

                    b.HasKey("ProductMagazineId");

                    b.HasIndex("CompanyId");

                    b.ToTable("ProductMagazines");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.ProformaModel.Proforma", b =>
                {
                    b.Property<int>("ProformaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProformaId"), 1L, 1);

                    b.Property<string>("AccountNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreateUser")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerCityCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerNip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateIssued")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DueDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsGenerated")
                        .HasColumnType("bit");

                    b.Property<double>("NetTotal")
                        .HasColumnType("float");

                    b.Property<string>("PaymentDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaceOfIssue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProformaNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerCityCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerIdName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SellerNip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Tax")
                        .HasColumnType("float");

                    b.Property<double>("Total")
                        .HasColumnType("float");

                    b.Property<string>("customerDeliveryAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("sellerDeliveryAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProformaId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("CustomerId");

                    b.ToTable("Proformas");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.UserModel.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"), 1L, 1);

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.HasIndex("CompanyId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.CustomerModel.Customer", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.CompanyModel.Company", null)
                        .WithMany("Customers")
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceCorrectModel.InvoiceCorrect", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.CompanyModel.Company", "Company")
                        .WithMany("InvoicesCorrect")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CompanyCompanionBackend.Models.CustomerModel.Customer", null)
                        .WithMany("InvoicesCorrect")
                        .HasForeignKey("CustomerId");

                    b.Navigation("Company");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceCountModel.InvoiceCount", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.CompanyModel.Company", null)
                        .WithMany("InvoiceCounts")
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceCountModel.ProformaCount", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.CompanyModel.Company", null)
                        .WithMany("ProformaCounts")
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceModel.Invoice", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.CompanyModel.Company", "Company")
                        .WithMany("Invoices")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CompanyCompanionBackend.Models.CustomerModel.Customer", null)
                        .WithMany("Invoices")
                        .HasForeignKey("CustomerId");

                    b.Navigation("Company");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceModel.Product", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.InvoiceCorrectModel.InvoiceCorrect", null)
                        .WithMany("Products")
                        .HasForeignKey("InvoiceCorrectId");

                    b.HasOne("CompanyCompanionBackend.Models.InvoiceModel.Invoice", null)
                        .WithMany("Products")
                        .HasForeignKey("InvoiceId");

                    b.HasOne("CompanyCompanionBackend.Models.ProformaModel.Proforma", null)
                        .WithMany("Products")
                        .HasForeignKey("ProformaId");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.ProdMagazine.ProductMagazine", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.CompanyModel.Company", null)
                        .WithMany("ProductMagazines")
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.ProformaModel.Proforma", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.CompanyModel.Company", "Company")
                        .WithMany("Proformas")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CompanyCompanionBackend.Models.CustomerModel.Customer", null)
                        .WithMany("Proformas")
                        .HasForeignKey("CustomerId");

                    b.Navigation("Company");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.UserModel.User", b =>
                {
                    b.HasOne("CompanyCompanionBackend.Models.CompanyModel.Company", "Company")
                        .WithMany("Users")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.CompanyModel.Company", b =>
                {
                    b.Navigation("Customers");

                    b.Navigation("InvoiceCounts");

                    b.Navigation("Invoices");

                    b.Navigation("InvoicesCorrect");

                    b.Navigation("ProductMagazines");

                    b.Navigation("ProformaCounts");

                    b.Navigation("Proformas");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.CustomerModel.Customer", b =>
                {
                    b.Navigation("Invoices");

                    b.Navigation("InvoicesCorrect");

                    b.Navigation("Proformas");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceCorrectModel.InvoiceCorrect", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.InvoiceModel.Invoice", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("CompanyCompanionBackend.Models.ProformaModel.Proforma", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
