export default function Footer() {
  return (
    <footer className="border-t border-primary bg-white">
      <div className="container mx-auto px-4 py-8 container-max text-sm text-charcoal">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} ForBeauty.mv</div>
          <div className="space-x-4">
            <a href="#privacy" className="hover:text-secondary">Privacy</a>
            <a href="#terms" className="hover:text-secondary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
