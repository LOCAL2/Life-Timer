# ⏳ Life Timer - ตัวจับเวลาชีวิต

แอปพลิเคชันเว็บที่ช่วยคำนวณและแสดงอายุของคุณแบบเรียลไทม์ พร้อมสถิติต่างๆ ที่น่าสนใจเกี่ยวกับการใช้ชีวิตของคุณ

## ✨ ฟีเจอร์หลัก

- 🎂 **คำนวณอายุแบบเรียลไทม์** - แสดงอายุที่แม่นยำถึงวินาที
- 📊 **สถิติชีวิต** - แสดงจำนวนวัน ชั่วโมง นาที และวินาทีที่คุณมีชีวิตอยู่
- 🎉 **นับถอยหลังวันเกิด** - บอกว่าอีกกี่วันจะถึงวันเกิดของคุณ
- 🌈 **ดีไซน์สวยงาม** - UI ที่ทันสมัยและใช้งานง่าย
- 📱 **รองรับทุกอุปกรณ์** - ใช้งานได้ทั้งบนมือถือและคอมพิวเตอร์

## 🛠️ เทคโนโลยีที่ใช้

- **[Next.js 15](https://nextjs.org)** - React Framework สำหรับการพัฒนาเว็บแอปพลิเคชัน
- **[React 18](https://reactjs.org)** - JavaScript Library สำหรับสร้าง User Interface
- **[Tailwind CSS](https://tailwindcss.com)** - CSS Framework สำหรับการจัดแต่งหน้าตา
- **[date-fns](https://date-fns.org)** - Library สำหรับการจัดการวันที่และเวลา
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer สำหรับ Three.js

## 🚀 การติดตั้งและใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js 18.0 หรือใหม่กว่า
- npm, yarn, pnpm หรือ bun

### การติดตั้ง

1. **Clone โปรเจกต์**
   ```bash
   git clone <repository-url>
   cd life-timer
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   # หรือ
   yarn install
   # หรือ
   pnpm install
   # หรือ
   bun install
   ```

3. **รันเซิร์ฟเวอร์พัฒนา**
   ```bash
   npm run dev
   # หรือ
   yarn dev
   # หรือ
   pnpm dev
   # หรือ
   bun dev
   ```

4. **เปิดเบราว์เซอร์**

   ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## 📖 วิธีใช้งาน

1. เปิดแอปพลิเคชันในเบราว์เซอร์
2. เลือกวันเกิดของคุณจากช่องกรอกวันที่
3. ระบบจะแสดงอายุของคุณแบบเรียลไทม์ทันที
4. ดูสถิติต่างๆ เช่น จำนวนวันที่มีชีวิต จำนวนชั่วโมง นาที และวินาที
5. ดูการนับถอยหลังไปยังวันเกิดครั้งถัดไป

## 🎨 การปรับแต่ง

คุณสามารถแก้ไขหน้าตาและฟีเจอร์ได้โดยการแก้ไขไฟล์ `src/app/page.js` ระบบจะอัปเดตหน้าเว็บอัตโนมัติเมื่อคุณบันทึกไฟล์

## 📦 คำสั่งที่มีให้ใช้

```bash
npm run dev      # รันเซิร์ฟเวอร์พัฒนา
npm run build    # สร้างไฟล์สำหรับ production
npm run start    # รันเซิร์ฟเวอร์ production
npm run lint     # ตรวจสอบ code style
```

## 🚀 การ Deploy

### Deploy บน Vercel (แนะนำ)

วิธีที่ง่ายที่สุดในการ deploy แอป Next.js คือการใช้ [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) จากผู้สร้าง Next.js

ดูรายละเอียดเพิ่มเติมได้ที่ [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## 📚 เรียนรู้เพิ่มเติม

หากต้องการเรียนรู้เพิ่มเติมเกี่ยวกับ Next.js สามารถดูได้จาก:

- [Next.js Documentation](https://nextjs.org/docs) - เรียนรู้เกี่ยวกับฟีเจอร์และ API ของ Next.js
- [Learn Next.js](https://nextjs.org/learn) - บทเรียน Next.js แบบ interactive
- [Next.js GitHub repository](https://github.com/vercel/next.js) - ยินดีรับ feedback และ contributions!

## 🤝 การมีส่วนร่วม

หากคุณต้องการมีส่วนร่วมในการพัฒนาโปรเจกต์นี้:

1. Fork โปรเจกต์
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจกต์นี้เป็น open source และใช้ภายใต้ MIT License

## 👨‍💻 ผู้พัฒนา

สร้างด้วย ❤️ โดยใช้ Next.js และ React

---

**หมายเหตุ:** แอปพลิเคชันนี้คำนวณอายุและสถิติต่างๆ บนเบราว์เซอร์ของคุณ ข้อมูลส่วนตัวจะไม่ถูกส่งไปยังเซิร์ฟเวอร์ใดๆ
