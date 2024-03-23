using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PRN231_Project.Models
{
    public partial class HouseRentalContext : DbContext
    {
        public HouseRentalContext()
        {
        }

        public HouseRentalContext(DbContextOptions<HouseRentalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Contract> Contracts { get; set; } = null!;
        public virtual DbSet<House> Houses { get; set; } = null!;
        public virtual DbSet<Note> Notes { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Permission> Permissions { get; set; } = null!;
        public virtual DbSet<Request> Requests { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Service> Services { get; set; } = null!;
        public virtual DbSet<Transaction> Transactions { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local);Database=HouseRental;User ID=sa;Password=123;Integrated Security=True;TrustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Contract>(entity =>
            {
                entity.ToTable("Contract");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(2048)
                    .HasColumnName("description");

                entity.Property(e => e.EndDate)
                    .HasColumnType("date")
                    .HasColumnName("endDate");

                entity.Property(e => e.FilePath)
                    .IsUnicode(false)
                    .HasColumnName("filePath");

                entity.Property(e => e.HouseId).HasColumnName("houseId");

                entity.Property(e => e.PaymentId).HasColumnName("paymentId");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("startDate");

                entity.Property(e => e.Type)
                    .HasMaxLength(255)
                    .HasColumnName("type");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.House)
                    .WithMany(p => p.Contracts)
                    .HasForeignKey(d => d.HouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Contract_House");

                entity.HasOne(d => d.Payment)
                    .WithMany(p => p.Contracts)
                    .HasForeignKey(d => d.PaymentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Contract_payments");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Contracts)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Contract_User");
            });

            modelBuilder.Entity<House>(entity =>
            {
                entity.ToTable("House");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CategoryId).HasColumnName("categoryId");

                entity.Property(e => e.Description)
                    .HasMaxLength(2048)
                    .HasColumnName("description");

                entity.Property(e => e.IsTenanted).HasColumnName("isTenanted");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Houses)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_House_categories1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Houses)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_House_User");

                entity.HasMany(d => d.Services)
                    .WithMany(p => p.Houses)
                    .UsingEntity<Dictionary<string, object>>(
                        "HouseService",
                        l => l.HasOne<Service>().WithMany().HasForeignKey("ServiceId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_HouseService_Service"),
                        r => r.HasOne<House>().WithMany().HasForeignKey("HouseId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_HouseService_House"),
                        j =>
                        {
                            j.HasKey("HouseId", "ServiceId");

                            j.ToTable("HouseService");

                            j.IndexerProperty<int>("HouseId").HasColumnName("houseId");

                            j.IndexerProperty<int>("ServiceId").HasColumnName("serviceId");
                        });
            });

            modelBuilder.Entity<Note>(entity =>
            {
                entity.ToTable("Note");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createDate")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.HouseId).HasColumnName("houseId");

                entity.Property(e => e.Note1).HasColumnName("note");

                entity.HasOne(d => d.House)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.HouseId)
                    .HasConstraintName("FK_Note_House");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("payments");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.IsPaid).HasColumnName("isPaid");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Tid)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("tid");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.When)
                    .HasColumnType("datetime")
                    .HasColumnName("when");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_payments_User");
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Request>(entity =>
            {
                entity.ToTable("Request");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(2048)
                    .HasColumnName("description");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .HasColumnName("status");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Requests)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Request_User");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.HasMany(d => d.Permissions)
                    .WithMany(p => p.Roles)
                    .UsingEntity<Dictionary<string, object>>(
                        "RolePermission",
                        l => l.HasOne<Permission>().WithMany().HasForeignKey("PermissionId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_RolePermission_Permission"),
                        r => r.HasOne<Role>().WithMany().HasForeignKey("RoleId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_RolePermission_Role"),
                        j =>
                        {
                            j.HasKey("RoleId", "PermissionId");

                            j.ToTable("RolePermission");

                            j.IndexerProperty<int>("RoleId").HasColumnName("roleId");

                            j.IndexerProperty<int>("PermissionId").HasColumnName("permissionId");
                        });
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.ToTable("Service");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(2048)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.ToTable("Transaction");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.BankSubAccId).HasMaxLength(100);

                entity.Property(e => e.CorresponsiveAccount).HasMaxLength(100);

                entity.Property(e => e.CorresponsiveBankId).HasMaxLength(100);

                entity.Property(e => e.CorresponsiveBankName).HasMaxLength(100);

                entity.Property(e => e.CorresponsiveName).HasMaxLength(100);

                entity.Property(e => e.CusumBalance).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SubAccId).HasMaxLength(100);

                entity.Property(e => e.Tid).HasMaxLength(100);

                entity.Property(e => e.VirtualAccount).HasMaxLength(100);

                entity.Property(e => e.VirtualAccountName).HasMaxLength(100);

                entity.Property(e => e.When).HasMaxLength(100);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("dob");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .HasColumnName("firstName");

                entity.Property(e => e.IdentificationNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("identificationNumber");

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .HasColumnName("lastName");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("phoneNumber");

                entity.Property(e => e.RefreshToken)
                    .HasMaxLength(100)
                    .HasColumnName("refreshToken");

                entity.Property(e => e.RefreshTokenExpiryTime)
                    .HasColumnType("datetime")
                    .HasColumnName("refreshTokenExpiryTime");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");

                entity.HasMany(d => d.Roles)
                    .WithMany(p => p.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserRole",
                        l => l.HasOne<Role>().WithMany().HasForeignKey("RoleId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_UserRole_Role"),
                        r => r.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_UserRole_User"),
                        j =>
                        {
                            j.HasKey("UserId", "RoleId");

                            j.ToTable("UserRole");

                            j.IndexerProperty<int>("UserId").HasColumnName("userId");

                            j.IndexerProperty<int>("RoleId").HasColumnName("roleId");
                        });
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
