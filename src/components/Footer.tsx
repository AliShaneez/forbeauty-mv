export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="container mx-auto px-4 py-8 container-max text-sm text-brand-700">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} ForBeauty.mv</div>
          <div className="space-x-4">
            <a href="#privacy" className="hover:text-brand-900">Privacy</a>
            <a href="#terms" className="hover:text-brand-900">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
