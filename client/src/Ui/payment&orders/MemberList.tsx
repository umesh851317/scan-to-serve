const MemberList = ({ members }) => {
       return (
              <section className="rounded-2xl bg-[#292929] p-4">

                     <div className="mb-2 flex items-center justify-between">

                            <h2 className="text-sm font-semibold text-gray-300">
                                   Members
                            </h2>

                            <span className="text-xs text-gray-500">
                                   {members?.length || 0 } joined
                            </span>

                     </div>

                     <div className="flex gap-3 overflow-x-auto pb-2">

                            {members?.length == 0 ? (
                                   <p className="text-sm text-gray-500">
                                          No members joined
                                   </p>
                            ) : (
                                   members?.map((member:any) => (
                                          <div
                                                 key={member._id}
                                                 className="min-w-45 shrink-0 rounded-xl border border-gray-700 bg-[#232323] p-2"
                                          >
                                                 <div className="flex items-center gap-3">

                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-sm font-semibold text-orange-400">
                                                               {member.name?.charAt(0)?.toUpperCase()}
                                                        </div>

                                                        <div className="min-w-0">

                                                               <p className="truncate text-sm font-medium text-white">
                                                                      {member.name}
                                                               </p>

                                                               {member.phone && (
                                                                      <p className="mt-1 truncate text-xs text-gray-500">
                                                                             {member.phone}
                                                                      </p>
                                                               )}

                                                        </div>

                                                 </div>

                                          </div>

                                   ))
                            )}

                     </div>

              </section>
       );
};

export default MemberList;