USE [master]
GO
/****** Object:  Database [HouseRental]    Script Date: 2/28/2024 9:46:54 PM ******/
CREATE DATABASE [HouseRental]
GO
ALTER DATABASE [HouseRental] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HouseRental] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HouseRental] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HouseRental] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HouseRental] SET ARITHABORT OFF 
GO
ALTER DATABASE [HouseRental] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [HouseRental] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HouseRental] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HouseRental] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HouseRental] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [HouseRental] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HouseRental] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HouseRental] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HouseRental] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HouseRental] SET  DISABLE_BROKER 
GO
ALTER DATABASE [HouseRental] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HouseRental] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HouseRental] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HouseRental] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [HouseRental] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HouseRental] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [HouseRental] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HouseRental] SET RECOVERY FULL 
GO
ALTER DATABASE [HouseRental] SET  MULTI_USER 
GO
ALTER DATABASE [HouseRental] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [HouseRental] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HouseRental] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [HouseRental] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [HouseRental] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [HouseRental] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'HouseRental', N'ON'
GO
ALTER DATABASE [HouseRental] SET QUERY_STORE = ON
GO
ALTER DATABASE [HouseRental] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [HouseRental]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[id] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_categories] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contract]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contract](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type] [nvarchar](255) NOT NULL,
	[description] [nvarchar](2048) NOT NULL,
	[startDate] [date] NOT NULL,
	[endDate] [date] NOT NULL,
	[price] [float] NOT NULL,
	[filePath] [varchar](max) NOT NULL,
	[userId] [int] NOT NULL,
	[paymentId] [int] NOT NULL,
	[houseId] [int] NOT NULL,
 CONSTRAINT [PK_Contract] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[House]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[House](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[price] [float] NOT NULL,
	[userId] [int] NOT NULL,
	[categoryId] [int] NOT NULL,
	[description] [nvarchar](2048) NOT NULL,
	[isTenanted] [bit] NOT NULL,
 CONSTRAINT [PK_Room] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HouseService]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HouseService](
	[houseId] [int] NOT NULL,
	[serviceId] [int] NOT NULL,
 CONSTRAINT [PK_HouseService] PRIMARY KEY CLUSTERED 
(
	[houseId] ASC,
	[serviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[payments]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[payments](
	[id] [int] NOT NULL,
	[userId] [int] NOT NULL,
	[amount] [float] NOT NULL,
	[invoice] [varchar](50) NOT NULL,
	[date_created] [date] NOT NULL,
 CONSTRAINT [PK_payments] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Request]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Request](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [nvarchar](2048) NOT NULL,
	[userId] [int] NOT NULL,
	[status] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Request] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_ROle] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Service]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Service](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](2048) NOT NULL,
 CONSTRAINT [PK_Service] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [nvarchar](255) NOT NULL,
	[lastName] [nvarchar](255) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[phoneNumber] [varchar](255) NOT NULL,
	[dob] [date] NOT NULL,
	[identificationNumber] [varchar](255) NOT NULL,
	[isActive] [bit] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRole]    Script Date: 2/28/2024 9:46:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRole](
	[userId] [int] NOT NULL,
	[roleId] [int] NOT NULL,
 CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED 
(
	[userId] ASC,
	[roleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Categories] ([id], [name]) VALUES (1, N'Duplex')
INSERT [dbo].[Categories] ([id], [name]) VALUES (2, N'Single-Family Home')
INSERT [dbo].[Categories] ([id], [name]) VALUES (3, N'Multi-Family Home')
INSERT [dbo].[Categories] ([id], [name]) VALUES (4, N'2-story house')
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([id], [name]) VALUES (1, N'Admin')
INSERT [dbo].[Role] ([id], [name]) VALUES (2, N'Tenant')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
ALTER TABLE [dbo].[Contract]  WITH CHECK ADD  CONSTRAINT [FK_Contract_House] FOREIGN KEY([houseId])
REFERENCES [dbo].[House] ([id])
GO
ALTER TABLE [dbo].[Contract] CHECK CONSTRAINT [FK_Contract_House]
GO
ALTER TABLE [dbo].[Contract]  WITH CHECK ADD  CONSTRAINT [FK_Contract_payments] FOREIGN KEY([paymentId])
REFERENCES [dbo].[payments] ([id])
GO
ALTER TABLE [dbo].[Contract] CHECK CONSTRAINT [FK_Contract_payments]
GO
ALTER TABLE [dbo].[Contract]  WITH CHECK ADD  CONSTRAINT [FK_Contract_User] FOREIGN KEY([userId])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Contract] CHECK CONSTRAINT [FK_Contract_User]
GO
ALTER TABLE [dbo].[House]  WITH CHECK ADD  CONSTRAINT [FK_House_categories1] FOREIGN KEY([categoryId])
REFERENCES [dbo].[Categories] ([id])
GO
ALTER TABLE [dbo].[House] CHECK CONSTRAINT [FK_House_categories1]
GO
ALTER TABLE [dbo].[House]  WITH CHECK ADD  CONSTRAINT [FK_House_User] FOREIGN KEY([userId])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[House] CHECK CONSTRAINT [FK_House_User]
GO
ALTER TABLE [dbo].[HouseService]  WITH CHECK ADD  CONSTRAINT [FK_HouseService_House] FOREIGN KEY([houseId])
REFERENCES [dbo].[House] ([id])
GO
ALTER TABLE [dbo].[HouseService] CHECK CONSTRAINT [FK_HouseService_House]
GO
ALTER TABLE [dbo].[HouseService]  WITH CHECK ADD  CONSTRAINT [FK_HouseService_Service] FOREIGN KEY([serviceId])
REFERENCES [dbo].[Service] ([id])
GO
ALTER TABLE [dbo].[HouseService] CHECK CONSTRAINT [FK_HouseService_Service]
GO
ALTER TABLE [dbo].[payments]  WITH CHECK ADD  CONSTRAINT [FK_payments_User] FOREIGN KEY([userId])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[payments] CHECK CONSTRAINT [FK_payments_User]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [FK_Request_User] FOREIGN KEY([userId])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [FK_Request_User]
GO
ALTER TABLE [dbo].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_Role] FOREIGN KEY([roleId])
REFERENCES [dbo].[Role] ([id])
GO
ALTER TABLE [dbo].[UserRole] CHECK CONSTRAINT [FK_UserRole_Role]
GO
ALTER TABLE [dbo].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_User] FOREIGN KEY([userId])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[UserRole] CHECK CONSTRAINT [FK_UserRole_User]
GO
USE [master]
GO
ALTER DATABASE [HouseRental] SET  READ_WRITE 
GO

ALTER TABLE [dbo].[User] ADD password nvarchar(50)
GO
ALTER TABLE [dbo].[User] ADD username nvarchar(50)
GO

INSERT INTO [dbo].[User]
           ([firstName]
           ,[lastName]
           ,[email]
           ,[phoneNumber]
           ,[dob]
           ,[identificationNumber]
           ,[isActive]
           ,[password]
           ,[username])
     VALUES
           ('thanh'
           ,'minh'
           ,'thanh@gmail.com'
           ,'123456789'
           ,'2002-11-02'
           ,'123456546574'
           ,1
           ,'123'
           ,'mkboss')

GO
INSERT INTO [dbo].[UserRole]
           ([userId]
           ,[roleId])
     VALUES
           (1
           ,1)
GO
ALTER TABLE [dbo].[User] ALTER COLUMN password nvarchar(50) NOT NULL;
GO
ALTER TABLE [dbo].[User] ALTER COLUMN username nvarchar(50) NOT NULL;
GO
ALTER TABLE [dbo].[User] ADD refreshToken nvarchar(100);
GO
ALTER TABLE [dbo].[User] ADD refreshTokenExpiryTime datetime;
GO


-- insert

INSERT INTO [dbo].[User]
           ([firstName]
           ,[lastName]
           ,[email]
           ,[phoneNumber]
           ,[dob]
           ,[identificationNumber]
           ,[isActive]
           ,[password]
           ,[username])
     VALUES
           ('viet'
           ,'hoang'
           ,'viet@gmail.com'
           ,'123456789'
           ,'2002-11-02'
           ,'123456546574'
           ,1
           ,'123'
           ,'viet')

INSERT INTO [dbo].[UserRole]
           ([userId]
           ,[roleId])
     VALUES
           (2
           ,2)

INSERT INTO [dbo].[House]
           ([name]
           ,[price]
           ,[userId]
           ,[categoryId]
           ,[description]
           ,[isTenanted])
     VALUES
           ('P001'
           ,125
           ,2
           ,1
           ,'The first house in 1st floor'
           ,0)

INSERT INTO [dbo].[payments]
           ([id]
           ,[userId]
           ,[amount]
           ,[invoice]
           ,[date_created])
     VALUES
           (1
           ,2
           ,125
           ,'0777893283'
           ,'2023-03-03')