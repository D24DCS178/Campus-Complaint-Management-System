function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`${color} h-16 w-16 rounded-2xl flex items-center justify-center text-white text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;