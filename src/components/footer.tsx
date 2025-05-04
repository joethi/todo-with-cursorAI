export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-5xl mx-auto p-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Todo List App. All rights reserved.</p>
      </div>
    </footer>
  )
}
